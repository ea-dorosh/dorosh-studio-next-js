"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  useState,
  useEffect,
} from 'react';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import appointmentsService from '@/services/appointments.service';

// Map service names to category images
const getCategoryImage = (serviceName) => {
  const lowerServiceName = serviceName?.toLowerCase() || ``;

  if (lowerServiceName.includes(`permanent`) ||
      lowerServiceName.includes(`powder brows`) ||
      lowerServiceName.includes(`velvet lips`) ||
      lowerServiceName.includes(`wimpernkranz`) ||
      lowerServiceName.includes(`hairstroke`)) {
    return `/images/design/pm_horizontal.avif`;
  }

  if (lowerServiceName.includes(`maniküre`) ||
      lowerServiceName.includes(`pediküre`) ||
      lowerServiceName.includes(`nails`) ||
      lowerServiceName.includes(`nagel`)) {
    return `/images/design/manik_1_horizontal.avif`;
  }

  if (lowerServiceName.includes(`lash`) ||
      lowerServiceName.includes(`brow`) ||
      lowerServiceName.includes(`wimpern`) ||
      lowerServiceName.includes(`augenbrauen`)) {
    return `/images/design/lashes_horizontal.avif`;
  }

  // Default image
  return `/images/design/pm_horizontal.avif`;
};

export default function AppointmentCancellation({ token }) {
  const theme = useTheme();
  const router = useRouter();

  const [appointment, setAppointment] = useState(null);
  const [groupAppointments, setGroupAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancellationMessage, setCancellationMessage] = useState(``);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [cancelledCount, setCancelledCount] = useState(0);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const response = await appointmentsService.getAppointmentByToken(token);
        setAppointment(response.data);

        // Set group appointments if they exist
        if (response.data.groupAppointments && response.data.groupAppointments.length > 0) {
          setGroupAppointments(response.data.groupAppointments);
        }
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAppointment();
    }
  }, [token]);

  const handleCancelClick = () => {
    setShowCancelForm(true);
  };

  const handleConfirmCancellation = async () => {
    try {
      setCancelling(true);
      const response = await appointmentsService.cancelAppointmentByToken(
        token,
        cancellationMessage || null
      );
      setCancelledCount(response.cancelledCount || 1);
      setCancelled(true);
    } catch (cancelError) {
      setError(cancelError.message);
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(`de-DE`, {
      weekday: `long`,
      year: `numeric`,
      month: `long`,
      day: `numeric`,
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString(`de-DE`, {
      hour: `2-digit`,
      minute: `2-digit`,
    });
  };

  const isAppointmentPast = () => {
    if (!appointment) return true;
    const appointmentDateTime = new Date(appointment.date);
    const now = new Date();
    return appointmentDateTime < now;
  };

  const isAppointmentCancelled = () => {
    return appointment?.status === 1; // AppointmentStatusEnum.Canceled
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
          minHeight: `60vh`,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !appointment) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          mx: `auto`,
          my: 8,
          px: 2,
        }}
      >
        <Card sx={{ overflow: `hidden` }}>
          {/* Fallback Image */}
          <Box
            sx={{
              position: `relative`,
              width: `100%`,
              height: {
                xs: 180,
                md: 240,
              },
              backgroundColor: theme.palette.grey[100],
            }}
          >
            <OptimizedImage
              src="/images/design/pm_horizontal.avif"
              alt="MOOD BEAUTY"
              fill
              sizes="600px"
              quality={80}
              style={{
                objectFit: `cover`,
                objectPosition: `center`,
                opacity: 0.6,
              }}
            />
          </Box>

          <CardContent sx={{ py: 4 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                textAlign: `center`,
                fontWeight: 600,
              }}
            >
              Termin nicht gefunden
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                textAlign: `center`,
                color: `text.secondary`,
              }}
            >
              Der gesuchte Termin existiert nicht mehr oder wurde bereits storniert.
            </Typography>

            <Box
              sx={{
                display: `flex`,
                gap: 2,
                justifyContent: `center`,
                flexWrap: `wrap`,
              }}
            >
              <Button
                variant="contained"
                onClick={() => router.push(`/`)}
                sx={{ minWidth: 150 }}
              >
                Zur Startseite
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`/booking`)}
                sx={{ minWidth: 150 }}
              >
                Neuen Termin buchen
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (cancelled) {
    return (
      <Box
        sx={{
          maxWidth: 700,
          mx: `auto`,
          my: 8,
          px: 2,
        }}
      >
        <Card>
          <CardContent sx={{ py: 4 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                textAlign: `center`,
                fontWeight: 600,
                color: `success.main`,
              }}
            >
              ✓ Termin erfolgreich storniert
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                textAlign: `center`,
                color: `text.secondary`,
                fontSize: `1.1rem`,
              }}
            >
              {cancelledCount > 1
                ? `Ihre ${cancelledCount} Termine wurden erfolgreich storniert.`
                : `Ihr Termin wurde erfolgreich storniert.`}
            </Typography>

            <Alert
              severity="info"
              sx={{
                mb: 4,
                '& .MuiAlert-message': {
                  width: `100%`,
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Bestätigungs-E-Mail versendet
              </Typography>
              <Typography variant="body2">
                Wir haben Ihnen eine Bestätigung der Stornierung an <strong>{appointment?.customer?.firstName ? appointment.customer.email : `Ihre E-Mail-Adresse`}</strong> gesendet.
                Bitte überprüfen Sie auch Ihren Spam-Ordner, falls Sie die E-Mail nicht erhalten.
              </Typography>
            </Alert>

            <Box
              sx={{
                backgroundColor: theme.palette.grey[50],
                borderRadius: 2,
                p: 3,
                mb: 4,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  fontSize: `1rem`,
                }}
              >
                {groupAppointments.length > 1 ? `Stornierte Termine` : `Stornierter Termin`}
              </Typography>

              {groupAppointments.length > 1 ? (
                <Box
                  sx={{
                    display: `flex`,
                    flexDirection: `column`,
                    gap: 3,
                  }}
                >
                  {groupAppointments.map((apt, index) => (
                    <Box
                      key={apt.id}
                      sx={{
                        pb: index < groupAppointments.length - 1 ? 2 : 0,
                        borderBottom: index < groupAppointments.length - 1 ? `1px solid ${theme.palette.divider}` : `none`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1.5,
                          fontWeight: 600,
                          color: `primary.main`,
                        }}
                      >
                        Service {index + 1}
                      </Typography>
                      <Box
                        sx={{
                          display: `flex`,
                          flexDirection: `column`,
                          gap: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            component="span"
                            sx={{
                              fontWeight: 600,
                              mr: 1,
                              fontSize: `0.95rem`,
                            }}
                          >
                            Service:
                          </Typography>
                          <Typography
                            component="span"
                            sx={{ fontSize: `0.95rem` }}
                          >
                            {apt.serviceName}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            component="span"
                            sx={{
                              fontWeight: 600,
                              mr: 1,
                              fontSize: `0.95rem`,
                            }}
                          >
                            Datum:
                          </Typography>
                          <Typography
                            component="span"
                            sx={{ fontSize: `0.95rem` }}
                          >
                            {formatDate(apt.date)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            component="span"
                            sx={{
                              fontWeight: 600,
                              mr: 1,
                              fontSize: `0.95rem`,
                            }}
                          >
                            Uhrzeit:
                          </Typography>
                          <Typography
                            component="span"
                            sx={{ fontSize: `0.95rem` }}
                          >
                            {formatTime(apt.timeStart)} Uhr
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: `flex`,
                    flexDirection: `column`,
                    gap: 1,
                  }}
                >
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                        fontSize: `0.95rem`,
                      }}
                    >
                      Service:
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ fontSize: `0.95rem` }}
                    >
                      {appointment?.serviceName}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                        fontSize: `0.95rem`,
                      }}
                    >
                      Datum:
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ fontSize: `0.95rem` }}
                    >
                      {appointment ? formatDate(appointment.date) : ``}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                        fontSize: `0.95rem`,
                      }}
                    >
                      Uhrzeit:
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ fontSize: `0.95rem` }}
                    >
                      {appointment ? formatTime(appointment.timeStart) : ``} Uhr
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            <Typography
              variant="body2"
              sx={{
                mb: 4,
                textAlign: `center`,
                color: `text.secondary`,
              }}
            >
              Wir hoffen, Sie bald wieder bei uns begrüßen zu dürfen!
            </Typography>

            <Box
              sx={{
                display: `flex`,
                gap: 2,
                justifyContent: `center`,
                flexWrap: `wrap`,
              }}
            >
              <Button
                variant="contained"
                onClick={() => router.push(`/`)}
                sx={{ minWidth: 150 }}
              >
                Zur Startseite
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`/booking`)}
                sx={{ minWidth: 150 }}
              >
                Neuen Termin buchen
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (isAppointmentPast() || isAppointmentCancelled()) {
    const categoryImage = getCategoryImage(appointment?.serviceName);

    return (
      <Box
        sx={{
          maxWidth: 600,
          mx: `auto`,
          my: 8,
          px: 2,
        }}
      >
        <Card sx={{ overflow: `hidden` }}>
          {/* Category Image */}
          <Box
            sx={{
              position: `relative`,
              width: `100%`,
              height: {
                xs: 180,
                md: 240,
              },
              backgroundColor: theme.palette.grey[100],
            }}
          >
            <OptimizedImage
              src={categoryImage}
              alt={appointment?.serviceName || `MOOD BEAUTY`}
              fill
              sizes="600px"
              quality={80}
              style={{
                objectFit: `cover`,
                objectPosition: `center`,
                opacity: 0.5,
              }}
            />
          </Box>

          <CardContent sx={{ py: 4 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                textAlign: `center`,
                fontWeight: 600,
              }}
            >
              {isAppointmentCancelled() ? `Termin bereits storniert` : `Termin abgelaufen`}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                textAlign: `center`,
                color: `text.secondary`,
              }}
            >
              {isAppointmentCancelled()
                ? `Dieser Termin wurde bereits storniert.`
                : `Dieser Termin liegt in der Vergangenheit und kann nicht mehr storniert werden.`}
            </Typography>

            <Box
              sx={{
                display: `flex`,
                gap: 2,
                justifyContent: `center`,
                flexWrap: `wrap`,
              }}
            >
              <Button
                variant="contained"
                onClick={() => router.push(`/`)}
                sx={{ minWidth: 150 }}
              >
                Zur Startseite
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`/booking`)}
                sx={{ minWidth: 150 }}
              >
                Neuen Termin buchen
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const categoryImage = getCategoryImage(appointment?.serviceName);

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: `auto`,
        my: 8,
        px: 2,
      }}
    >
      <Card
        sx={{
          overflow: `hidden`,
        }}
      >
        {/* Category Image Header */}
        <Box
          sx={{
            position: `relative`,
            width: `100%`,
            height: {
              xs: 200,
              md: 280,
            },
            backgroundColor: theme.palette.grey[100],
          }}
        >
          <OptimizedImage
            src={categoryImage}
            alt={appointment?.serviceName || `MOOD BEAUTY`}
            fill
            sizes="700px"
            quality={90}
            style={{
              objectFit: `cover`,
              objectPosition: `center`,
            }}
          />
          {/* Overlay for better text readability */}
          <Box
            sx={{
              position: `absolute`,
              bottom: 0,
              left: 0,
              right: 0,
              background: `linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)`,
              height: `60%`,
            }}
          />
        </Box>

        <CardContent
          sx={{
            p: {
              xs: 3,
              md: 5,
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 1,
              textAlign: `center`,
              fontWeight: 700,
              fontSize: {
                xs: `1.75rem`,
                md: `2.25rem`,
              },
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Hallo {appointment.customer.firstName} {appointment.customer.lastName}!
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              textAlign: `center`,
              fontWeight: 500,
              color: `text.secondary`,
              fontSize: {
                xs: `1.1rem`,
                md: `1.3rem`,
              },
            }}
          >
            Ihr Termin bei MOOD BEAUTY
          </Typography>

          <Box
            sx={{
              backgroundColor: theme.palette.grey[50],
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              p: 3,
              mb: 4,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                fontWeight: 600,
                fontSize: `1.1rem`,
              }}
            >
              {groupAppointments.length > 1 ? `Termindetails (${groupAppointments.length} Services)` : `Termindetails`}
            </Typography>

            {groupAppointments.length > 1 && (
              <Alert
                severity="info"
                sx={{
                  mb: 2,
                  fontSize: `0.9rem`,
                }}
              >
                Sie haben {groupAppointments.length} Services gebucht. Beide werden zusammen storniert.
              </Alert>
            )}

            <Box
              sx={{
                display: `flex`,
                flexDirection: `column`,
                gap: 1.5,
              }}
            >
              {groupAppointments.length > 1 ? (
                <>
                  {groupAppointments.map((apt, index) => (
                    <Box
                      key={apt.id}
                      sx={{
                        display: `flex`,
                        flexDirection: `column`,
                        gap: 0.5,
                        pb: index < groupAppointments.length - 1 ? 2 : 0,
                        borderBottom: index < groupAppointments.length - 1 ? `1px solid` : `none`,
                        borderColor: index < groupAppointments.length - 1 ? `grey.200` : `transparent`,
                      }}
                    >
                      <Box>
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: 600,
                            mr: 1,
                          }}
                        >
                          Service {index + 1}:
                        </Typography>
                        <Typography component="span">
                          {apt.serviceName}
                        </Typography>
                        {apt.status === 1 && (
                          <Typography
                            component="span"
                            sx={{
                              ml: 1,
                              color: `error.main`,
                              fontSize: `0.9rem`,
                            }}
                          >
                            (bereits storniert)
                          </Typography>
                        )}
                      </Box>

                      <Box
                        sx={{
                          pl: 2,
                          display: `flex`,
                          flexDirection: `column`,
                          gap: 0.5,
                        }}
                      >
                        <Box>
                          <Typography
                            component="span"
                            sx={{
                              fontWeight: 500,
                              mr: 1,
                              fontSize: `0.95rem`,
                            }}
                          >
                            Uhrzeit:
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              fontSize: `0.95rem`,
                            }}
                          >
                            {formatTime(apt.timeStart)} Uhr
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            component="span"
                            sx={{
                              fontWeight: 500,
                              mr: 1,
                              fontSize: `0.95rem`,
                            }}
                          >
                            Spezialist:
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              fontSize: `0.95rem`,
                            }}
                          >
                            {apt.employee.firstName} {apt.employee.lastName}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}

                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Datum:
                    </Typography>
                    <Typography component="span">
                      {formatDate(groupAppointments[0].date)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Standort:
                    </Typography>
                    <Typography component="span">
                      {appointment.location}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Service:
                    </Typography>
                    <Typography component="span">
                      {appointment.serviceName}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Datum:
                    </Typography>
                    <Typography component="span">
                      {formatDate(appointment.date)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Uhrzeit:
                    </Typography>
                    <Typography component="span">
                      {formatTime(appointment.timeStart)} Uhr
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Standort:
                    </Typography>
                    <Typography component="span">
                      {appointment.location}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      Spezialist:
                    </Typography>
                    <Typography component="span">
                      {appointment.employee.firstName} {appointment.employee.lastName}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {!showCancelForm ? (
            <>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  textAlign: `center`,
                  lineHeight: 1.7,
                  color: `text.secondary`,
                }}
              >
                Wir freuen uns auf Ihren Besuch! Falls sich Ihre Pläne geändert haben
                und Sie {groupAppointments.length > 1 ? `die Termine` : `den Termin`} nicht wahrnehmen können, können Sie {groupAppointments.length > 1 ? `sie` : `ihn`} hier stornieren.
              </Typography>

              <Box
                sx={{
                  display: `flex`,
                  justifyContent: `center`,
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleCancelClick}
                  sx={{
                    px: 4,
                    py: 1.5,
                  }}
                >
                  {groupAppointments.length > 1 ? `Alle Termine stornieren` : `Termin stornieren`}
                </Button>
              </Box>
            </>
          ) : (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                Möchten Sie uns mitteilen, warum Sie {groupAppointments.length > 1 ? `die Termine` : `den Termin`} stornieren? (Optional)
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Ihre Nachricht (max. 200 Zeichen)"
                value={cancellationMessage}
                onChange={(event) => setCancellationMessage(event.target.value)}
                inputProps={{ maxLength: 200 }}
                sx={{ mb: 3 }}
                helperText={`${cancellationMessage.length}/200 Zeichen`}
              />

              <Alert
                severity="warning"
                sx={{ mb: 3 }}
              >
                Sie sind dabei, {groupAppointments.length > 1 ? `alle ${groupAppointments.length} Termine` : `Ihren Termin`} zu stornieren. Diese Aktion kann nicht rückgängig gemacht werden.
              </Alert>

              <Box
                sx={{
                  display: `flex`,
                  gap: 2,
                  justifyContent: `center`,
                  flexWrap: `wrap`,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowCancelForm(false)}
                  disabled={cancelling}
                  sx={{ width: 220 }}
                >
                  Abbrechen
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleConfirmCancellation}
                  disabled={cancelling}
                  sx={{ width: 220 }}
                >
                  {cancelling ? <CircularProgress size={24} /> : `Stornierung bestätigen`}
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

